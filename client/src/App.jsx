import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/notes");
            setNotes(response.data);
        } catch (err) {
            console.error('Error fetching notes:', err);
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/notes", { text: newNote });
            setNewNote('');
            fetchNotes();
        } catch (err) {
            console.error('Error creating note:', err);
            setError(err.message);
        }
    };

    return (
        <div className="container" style={styles.container}>
            <h1 style={styles.title}>MERN Notes App</h1>

            {/* Form Section */}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter a new note"
                    style={styles.input}
                    disabled={loading}
                />
                <button
                    type="submit"
                    style={styles.button}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Note'}
                </button>
            </form>

            {/* Error Display */}
            {error && (
                <div style={styles.error}>
                    {error}
                </div>
            )}

            {/* Notes List */}
            <div style={styles.notesList}>
                {loading && <div>Loading...</div>}
                {notes.length === 0 && !loading && (
                    <div style={styles.emptyMessage}>No notes yet. Add your first note!</div>
                )}
                {notes.map((note) => (
                    <div key={note._id} style={styles.note}>
                        {note.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Styles
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
    },
    title: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
    },
    input: {
        flex: 1,
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#ffe6e6',
        borderRadius: '4px',
    },
    notesList: {
        marginTop: '20px',
    },
    note: {
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        marginBottom: '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    emptyMessage: {
        textAlign: 'center',
        color: '#666',
        padding: '20px',
    }
};

export default App;