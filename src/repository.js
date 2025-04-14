import crypto from 'crypto'

const coursesRepository = () => {
    const courses = []

    const create = ({ name, creditHours }) => {
        const newCourse = {
            id: crypto.randomUUID(),
            name,
            creditHours,
            required: false,
        };
        courses.push(newCourse)
        return newCourse
    }

    const getById = (id) => {
        return courses.find(course => course.id === id);
    }

    const list = (name = "") => {
        return courses.filter(user => {
            return courses.name.toLowerCase().includes(name.toLowerCase());
        });
    };

    const update = (id, data) => {
        const course = courses.findById(id)
        if (!course) return null

        course.name = data.name;
        course.creditHours = data.creditHours;
        course.required = data.required;

        return course
    }

    const remove = (id) => {
        const index = courses.findIndex(course => course.id === id)
        if (index === -1) return false
        courses.splice(index, 1)
        return true
    }

    return {
        create,
        getById,
        list,
        update,
        remove,
    }
}

export default coursesRepository