import { useState } from "react";

const CreateClass = (props) => {
    const [data, setData] = useState({});

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createClass(data);
        setData({});
    };
    
    return (
        <div>
            <div>
                <h2 className="text-center">Add Class</h2>
            </div>
            <div className="pd-5">
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <span>Name *  </span>
                        <input
                            className="ml-2" 
                            type="String" 
                            name="name" 
                            value={data.name} 
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <span>Day *  </span>
                        <select
                            className="ml-2" 
                            type="String" 
                            name="day" 
                            value={data.day} 
                            onChange={handleChange} 
                            required
                        >
                            <option>-</option>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                        </select>
                    </div>
                    <div>
                    <span>Hour *  </span>
                        <input
                            className="ml-2" 
                            type="String" 
                            name="hour" 
                            value={data.hour} 
                            onChange={handleChange} 
                            required
                        />
                        <span> : </span>
                        <input
                            className="ml-2" 
                            type="String" 
                            name="minute" 
                            value={data.minute} 
                            onChange={handleChange} 
                            required
                        />

                    </div>
                    <div>
                        <span>Hour end*  </span>
                        <input
                            className="ml-2" 
                            type="String" 
                            name="hour_end" 
                            value={data.hour_end} 
                            onChange={handleChange} 
                            required
                        />
                        <span> : </span>
                        <input
                            className="ml-2" 
                            type="String" 
                            name="minute_end" 
                            value={data.minute_end} 
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
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateClass;