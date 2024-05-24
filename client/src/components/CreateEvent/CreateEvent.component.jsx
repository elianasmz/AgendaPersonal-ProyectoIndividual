import { useState } from "react";

const CreateEvent = (props) => {
    const [data, setData] = useState({});

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createEvent(data);
        setData({});
    };


    return (
        <div>
            <div>
                <h2 className="text-center">Create Event</h2>
            </div>
            <div className="pd-5">
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <span>Name *  </span>
                        <input
                            className="ml-2" 
                            type="text" 
                            name="name" 
                            value={data.name} 
                            onChange={handleChange}
                            required
                            placeholder="minimo 3 caracteres"
                        />
                    </div>
                    <div>
                        <span>Date *  </span>
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
                        <span>Description *  </span>
                        <input
                            className="ml-2" 
                            type="String" 
                            name="description" 
                            value={data.description} 
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

export default CreateEvent;