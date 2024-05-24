import "./CreateTask.style.css";
import { useState } from "react";

const CreateTask = (props) => {
    const [data, setData] = useState({});

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createTask(data);
        setData({});
    };


    return (
        <div>
            <div>
                <h2 className="text-center">Create Task</h2>
            </div>
            <div className="pd-5">
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <span>Task *  </span>
                        <input
                            className="ml-2" 
                            type="text" 
                            name="name" 
                            value={data.name} 
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <span>Due Date *  </span>
                        <input
                            className="ml-2" 
                            type="Date" 
                            name="date" 
                            value={data.date} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div>
                        <button 
                            className="button-submit"
                            onClick={handleSubmit} 
                            type="submit"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default CreateTask;
