import express from "express"
import coursesRepository from "./repository.js"

const app = express()
const port = 3000
const courses = coursesRepository()

app.use(express.json())

app.get('/disciplinas', (req, res)=>{
    const { name } = req.query
    const list = courses.list(name)
    res.set("X-Total-Count", list.length)
    res.json(list)
})

app.get('/disciplinas/:id', (req, res)=>{
    const { id } = req.params
    const course = courses.getById(id)

    if (!course) {
        return res.status(404).json({message: "Course not found"})
    }

    res.json(course)
})

app.post('/disciplinas', (req, res)=>{
    const { name , creditHours } = req.body
    const course = courses.create({ name , creditHours })

    res.status(201).json(course)
})

app.put('/disciplinas/:id', (req, res)=>{
    const { id } = req.params
    const { name , creditHours } = req.body
    const updatedCourse = courses.update(id, { name , creditHours })

    if (!updatedCourse) {
        return res.status(404).json({message: "Course not found"})
    }

    res.json(updatedCourse)
})

app.delete('/disciplinas/:id', (req, res)=>{
    const { id } = req.params
    const result = courses.remove(id)

    if (!result) {
        return res.status(404).json({message: "Course not found"})
    }
    res.status(204).send()
})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})