import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Challenge() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [opponentName, setOpponentName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchChallenge = () => {
    fetch(`http://localhost:5000/api/challenges/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setChallenge(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch challenge", err);
        setError("Error loading challenge");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchChallenge();
  }, [id]);

  const handleJoin = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/challenges/${id}/join`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opponent: opponentName }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to join");

      setChallenge(data.challenge);
      setOpponentName("");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!challenge) return <p>Challenge not found</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-2">Challenge Room</h1>
      <p><strong>Idea:</strong> {challenge.idea}</p>
      <p><strong>Player 1:</strong> {challenge.name}</p>

      {challenge.opponent ? (
        <p><strong>Player 2:</strong> {challenge.opponent}</p>
      ) : (
        <div className="mt-4">
          <input
            type="text"
            value={opponentName}
            onChange={(e) => setOpponentName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2 border rounded"
          />
          <button
            onClick={handleJoin}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Join as second player
          </button>
        </div>
      )}
    </div>
  );
}
