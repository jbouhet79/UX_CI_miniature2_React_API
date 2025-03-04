import './cartePost.css';

export const CartePost = ({id, owner, content, parent, createAt, likes}) => {

    return (
        <section className="carte">
            <div className="entete">
                if ({owner}) {

                } else {
                    
                }
                <div>{owner}</div>
                <div>{createAt}</div>
            </div>
            <div className="contenu">{content}</div>
            <div className="pied">
                <div>likes : {likes}</div>
                <div>commentaires</div>
                <div>partager</div>
            </div>
        </section>
    )
}