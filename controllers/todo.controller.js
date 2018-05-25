const jwt = require('jsonwebtoken')
const mTodo = require('../models/todo.model')
const mongoose = require('mongoose');

module.exports = {
    listTodo: (req, res) => {
        const user = req.headers.decoded.id
        mTodo.find({
            user
        })
        .then(result => {
            res.status(200).send({
                message: 'query todo success',
                data: result
            })
        })
        .catch(error => {
            res.status(400).send({
                message: err.message
            })
        })
    },
    addTodo: (req, res) => {
        const user = req.headers.decoded.id
        const {task} = req.body
        let newTask = new mTodo({
            user,
            task
        })
        newTask.save()
            .then(result => {
                res.status(201).send({
                    message: 'create todo success',
                    data: result
                })
            })
            .catch(error => {
                res.status(400).send({
                    message: err.message
                })
            })
    },
    editTodo: (req, res) => {
        const id = mongoose.Types.ObjectId(req.body.id)
        const {isComplete} = req.body
        const user = req.headers.decoded.id
        mTodo.findById(id, (err, todo) => {
            if(err) {
                res.status(400).send({
                    message: err.message
                })
            } else {
                if(todo.user == user) {
                    mTodo.update({
                        _id: id
                    }, {
                        $set: {
                            isComplete
                        }
                    }, {
                        overwrite: false
                    }, (err, result) => {
                        if(err) {
                            res.status(400).send({
                                message: err.message
                            })
                        } else {
                            res.status(200).send({
                                message: 'edit todo success',
                                data: todo
                            })
                        }
                    })
                } else {
                    res.status(400).send({
                        message: 'User tidak valid'
                    })
                }
            }
        })
    },
    editTask: (req, res) => {
      const id = mongoose.Types.ObjectId(req.body.id)
      const {task} = req.body
      const user = req.headers.decoded.id
      mTodo.findById(id, (err, todo) => {
        if(err) {
          res.status(400).send({
            message: err.message
          })
        } else {
          if(todo.user == user) {
            mTodo.update({
              _id: id
            }, {
              $set: {
                task
              }
            }, {
              overwrite: false
            }, (err, result) => {
              if(err) {
                res.status(400).send({
                  message: err.message
                })
              } else {
                res.status(200).send({
                  message: 'edit task success',
                  data: todo
                })
              }
            })
          } else {
            res.status(400).send({
              message: 'User tidak valid'
            })
          }
        }
      })
    },
    editBgcolor: (req, res) => {
      const id = mongoose.Types.ObjectId(req.body.id)
      const {bgColor} = req.body
      const user = req.headers.decoded.id
      mTodo.findById(id, (err, todo) => {
        if(err) {
          res.status(400).send({
            message: err.message
          })
        } else {
          if(todo.user == user) {
            mTodo.update({
              _id: id
            }, {
              $set: {
                bgColor
              }
            }, {
              overwrite: false
            }, (err, result) => {
              if(err) {
                res.status(400).send({
                  message: err.message
                })
              } else {
                res.status(200).send({
                  message: 'edit task success',
                  data: todo
                })
              }
            })
          } else {
            res.status(400).send({
              message: 'User tidak valid'
            })
          }
        }
      })
    },
    deleteTodo: (req, res) => {
        const id = mongoose.Types.ObjectId(req.params.id)
        const user = req.headers.decoded.id
        mTodo.findById(id, (err, todo) => {
            if(err) {
                res.status(400).send({
                    message: err.message
                })
            } else {
                if(todo.user == user) {
                    mTodo.remove({
                        _id: id
                    }, (err) => {
                        if(err) {
                            res.status(400).send({
                                message: err.message
                            })
                        } else {
                            res.status(200).send({
                                message: 'delete todo success',
                                data: todo
                            })
                        }
                    })
                } else {
                    res.status(400).send({
                        message: 'User tidak valid'
                    })
                }
            }
        })
    }
}
