const { tasksModel, commentsModel, usersModel } = require('../models/index')
const { Sequelize } = require('sequelize')
const {sequelize} = require('../config/mysql'); 

const registerTask = async (req, res) => {
  try {

    const body = req.body

    const title = body.title;
    const statusId = body.statusId
    const projectId = body.projectId
    
    const newTaskOrder = await tasksModel.count({
      where: {
        statusId,
        projectId
      }
    })

    const data = await tasksModel.create({ title, ...body, "order": newTaskOrder});
    res.send({ success: true, data });
  } catch (e) {
    res.status(400).json({ success: false, e});
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await tasksModel.findAll({
        order: [
            ['id', 'ASC']
        ]
    })
    res.status(200).json({ success: true, data: tasks })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
};

const getTasksByProject = async (req, res) => {
  try {
    const projectId = req.params.id

    const tasks = await tasksModel.findAll({
        where: {
            projectId
        },
        include: [{
          model: commentsModel,
          as:'comments',
          include: [{
              model: usersModel,
              as: 'user', // Asegúrate de que este alias también está correctamente definido en su respectiva asociación
              attributes: ['id', 'name'] // Asegúrate de incluir los atributos que realmente necesitas
          }]
        }],
        order: [
          ['order', 'ASC'],
          [{ model: commentsModel, as: 'comments' }, 'id', 'DESC']
        ]
    })
    res.status(200).json({ success: true, data: tasks })
  } catch (error) {
    console.error("Error fetching tasks with comments:", error);
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch tasks' });
  }
};

const reOrderTasks = async (req, res) => {
  const { taskId, newOrder, oldOrder, oldStatusId, newStatusId } = req.body;

  try {
    // Iniciar una transacción
    await sequelize.transaction(async (t) => {
      // Si la tarea cambia de estado
      if (oldStatusId !== newStatusId) {
        // Decrementa el orden de las tareas por debajo de la antigua posición en el antiguo estado
        await tasksModel.update(
          { order: Sequelize.literal('`order` - 1') },
          {
            where: {
              order: { [Sequelize.Op.gt]: oldOrder },
              statusId: oldStatusId
            },
            transaction: t
          }
        );

        // Incrementa el orden de las tareas por encima de la nueva posición en el nuevo estado
        await tasksModel.update(
          { order: Sequelize.literal('`order` + 1') },
          {
            where: {
              order: { [Sequelize.Op.gte]: newOrder },
              statusId: newStatusId
            },
            transaction: t
          }
        );
      } else {
        // Si la tarea se mueve dentro del mismo estado
        if (newOrder < oldOrder) {
          // Mover hacia arriba
          await tasksModel.update(
            { order: Sequelize.literal('`order` + 1') },
            {
              where: {
                order: { [Sequelize.Op.between]: [newOrder, oldOrder - 1] },
                statusId: oldStatusId
              },
              transaction: t
            }
          );
        } else if (newOrder > oldOrder) {
          // Mover hacia abajo
          await tasksModel.update(
            { order: Sequelize.literal('`order` - 1') },
            {
              where: {
                order: { [Sequelize.Op.between]: [oldOrder + 1, newOrder] },
                statusId: oldStatusId
              },
              transaction: t
            }
          );
        }
      }

      // Actualizar la tarea movida con el nuevo estado y el nuevo orden
      await tasksModel.update(
        { statusId: newStatusId, order: newOrder },
        {
          where: { id: taskId },
          transaction: t
        }
      );
    });

    res.json({ success: true, message: 'Task reordered and moved successfully' });
  } catch (error) {
    console.error('Failed to reorder and move task:', error);
    res.status(500).json({ success: false, message: 'Failed to reorder and move task' });
  }
};

const removeTask = async (req, res) => {
  try {
    const taskId = req.params.id
    
    const taskToRemove = await tasksModel.findByPk(taskId)

    await sequelize.transaction(async (t) => {
      // Elimina la tarea
      await taskToRemove.destroy({ transaction: t });

      // Actualiza el orden de las tareas que están después de la eliminada
      await tasksModel.update(
          { order: sequelize.literal('`order` - 1') },
          {
              where: {
                  order: { [Sequelize.Op.gt]: taskToRemove.order },  // Afecta solo a las tareas con un orden mayor al de la tarea eliminada
                  projectId: taskToRemove.projectId  // Asumiendo que las tareas están agrupadas por un proyecto
              },
              transaction: t
          }
      );
    });
    res.status(200).json({ success: true})
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
};

module.exports = {
    registerTask,
    getTasks,
    getTasksByProject,
    reOrderTasks,
    removeTask
}