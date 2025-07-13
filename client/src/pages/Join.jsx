import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Join() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [idea, setIdea] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/challenges", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, idea }),
            });

            const data = await res.json();
            console.log(data);

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            // Redirect to challenge room
            navigate(`/challenge/${data.id}`);
        } catch (err) {
            console.error(err);
            alert("Failed to submit challenge");
        }
    };


    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h1 className="text-2xl font-semibold mb-4">Join a Challenge</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium">Your Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Challenge Idea</label>
                    <input
                        type="text"
                        required
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Join
                </button>
            </form>
        </div>
    );
}
