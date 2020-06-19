const { Task , User } = require('../models')

class TaskController{

    static findAll(req,res,next){
        Task.findAll({
            include: [User]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            next(err)
            // res.status(500)
        })
    }

    static findOne(req,res,next){
        Task.findOne({
            where:{
                id: req.params.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            next(err)
            // res.status(500)
        })
    }

    static addTask(req,res,next){
        var obj = {
            title: req.body.title,
            category: req.body.category,
            UserId: req.userData.id
        }
        console.log(obj,'<<<obj add')
        Task.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
            // res.status(400)
        })
    }

    // static updateTask(req,res){
    //     Task.findByPk(req.params.id)
    //     .then(data => {
    //         res.status(200).json(data)
    //     })
    //     .catch(err => {
    //         next(err)
    //         // res.status(404)
    //     })
    // }

    static updateTask(req,res){
        var obj = {
            title: req.body.title,
            category: req.body.category,
            UserId: req.body.UserId
        }

        Task.update(obj,{where: {id:req.params.id}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
            // res.status(400)
        })
    }

    static delete(req,res){
        Task.destroy({where: {id:req.params.id}})
        .then(data => {
            res.status(200).json({message: "Task deleted"})
        })
        .catch(err => {
            next(err)
            // res.status(500).json({message: err.message})
        })
    }

}

module.exports = TaskController