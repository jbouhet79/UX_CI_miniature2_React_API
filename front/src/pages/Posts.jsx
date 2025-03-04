import { CartePost } from '../components/CartePost';
import './posts.css';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';

const Posts = () => {
    const [post, setPost] = useState(null); // État pour stocker les données du post
    const [loading, setLoading] = useState(true); // Indicateur de chargement
    const [error, setError] = useState(null); // Pour gérer les erreurs
    const { accessToken } = useAuth();

    useEffect(() => {
        // Effectuer la requête GET
        fetch('http://localhost:8080/api/posts/1', {
            // method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken, // pour spécifier le header de la requête
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur dans la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                // Vérifie si les données existent et récupère le premier post
                if (data.content && data.content.length > 0) {
                    setPost(data.content[0]); // Le premier post
                } else {
                    setError('Aucun post trouvé.');
                }
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [accessToken]); // L'effet se lance à chaque modif de la dépendance : accessToken

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    // Si le post est récupéré, afficher le composant CartePost
    return (
        <div className="pagePosts">
            <p>Posts</p>
            {post ? (
                <CartePost
                    id={post.id}
                    owner={post.owner}
                    content={post.content}
                    createAt={post.createdAt}
                    likes={post.likes.length} // Affiche le nombre de likes
                />
            ) : (
                <div>Le post n'a pas pu être récupéré.</div>
            )}
        </div>
    );


    // return (
    //     <div className='pagePosts'>
    //         <p>Posts</p>
    //         <CartePost
    //             id={1}
    //             owner="Jean-Marc"
    //             content="blabla............"
    //             createAt="2025_03_03"
    //             likes={5}
    //         />
    //         <CartePost
    //             id={1}
    //             owner="Jean-Marc"
    //             content="blabla............"
    //             createAt="2025_03_03"
    //             likes={5}
    //         />
    //         <CartePost
    //             id={1}
    //             owner="Jean-Marc"
    //             content="blabla............"
    //             createAt="2025_03_03"
    //             likes={5}
    //         />
    //         <CartePost
    //             id={1}
    //             owner="Jean-Marc"
    //             content="blabla............"
    //             createAt="2025_03_03"
    //             likes={5}
    //         />
    //                     <CartePost
    //             id={1}
    //             owner="Jean-Marc"
    //             content="blabla............"
    //             createAt="2025_03_03"
    //             likes={5}
    //         />

    //     </div>

    // )
};

export default Posts;