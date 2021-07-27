import './Home.css';
import ContactCard from "./ContactCard";
let json = require('./../data.json');

function Home() {
    var photographers = [];
    for (const photographer of json.photographers) {
        photographers.push(ContactCard(photographer));
    }
 return(
    <div>
        <Header />
            <div className="users">
                {photographers.map(photographer => 
                    <div key={photographer.id}>{photographer}</div>
                )}
            </div>
    </div>
 );
}

function Header() {
    return (
        <header className="index">
        <a className="icon" href="/">FishEye</a>
        <nav className="index__tag">
            <div className="bottom">#Portrait</div>
            <div className="bottom">#Art</div>
            <div className="bottom">#Fashion</div>
            <div className="bottom">#Architecture</div>
            <div className="bottom">#Travel</div>
            <div className="bottom">#Sport</div>
            <div className="bottom">#Animals</div>
            <div className="bottom">#Events</div>
        </nav>
        <div className="index__title">Nos photographes</div>
        </header>
    );
}
export default Home;