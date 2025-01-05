import "./nav.css";
import { NavLink } from "react-router-dom";

function NAV(){
    const pages:string[] = ["","/get_token","/look_my_user","/look_all_users"];

    return (
        <div className="nav_container">
            <h1>Navegador</h1>
            <u className="ul">
                    {pages.map((url) => (
                        <li>
                            <NavLink key={url} to={url}>
                                {(() => {
                                    switch (url) {
                                        case "":
                                            return "Register Form";
                                        case "/get_token":
                                            return "Get Token";
                                        case "/look_my_user":
                                            return "Look my user";
                                        case "/look_all_users":
                                            return "Look all users";
                                    }
                                })}
                            </NavLink>
                        </li>
                    ))}
            </u>
        </div>
    );
};

export default NAV;