function Card({ userData }) {
    console.log(userData)
    return (
        <div className="card">
            <h2>{userData.name}</h2>
            <p className="description">{userData.description}</p>
            <h3>Interests</h3>
            <ul className="interests__list">
                {(userData.interests).map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>
            <div>
                {userData.socials.map((item, idx) => (
                    <a key={idx} href={item.link}>
                        <button className="button" key={idx}>{item.name}</button>
                    </a>
                ))}
            </div>

        </div>
    )
}

export default Card