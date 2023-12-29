import React from "react";
import { Link } from "react-router-dom";
// import Articles from "../dummyData";
import Articles from "../components/Articles";
import { useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useContext } from "react";
// import axios from "axios";

const Home = () => {
    const [articles, setArticle] = useState(null);
    //const [fetchdata, setFetchdata] = useState(null);

    const {user} = useContext(UserContext);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('http://localhost:8800/articles');
                const json = await response.json();
                console.log(json);
                // const contentType = response.headers.get('content-type');
                if (response.ok) {
                    setArticle(json);
                }
            } catch (e) {
                console.error('Error fetching articles', e)
            }
        }
        fetchArticles();
    }, [])
    return <>
       
    <div class="tab-content m-auto uni-padding" id="v-pills-tabContent">
        <div class="container tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <div className="d-flex justify-content-between mt-3">
                <ul className="nav nav-pills">
                    <li className="navItem">
                        <Link className="navItem__navLink" aria-current="page" >Articles</Link>
                        <div className="overlay"></div>
                    </li>
                    <li className="navItem">
                        <Link className="navItem__navLink" >Stories</Link>
                        <div className="overlay"></div>
                    </li>
                    <li className="navItem">
                        <Link className="navItem__navLink" >Poems</Link>
                        <div className="overlay"></div>
                    </li>
                    <li className="navItem">
                        <Link className="navItem__navLink">Books</Link>
                        <div className="overlay"></div>
                    </li>
                    <li className="navItem">
                        <Link className="navItem__navLink">News</Link>
                        <div className="overlay"></div>
                    </li>
                </ul>

                {
                    !!user && (<Link to={`write`} className="btn btn-dark text-success"> <span className="fw-bolder">+</span> Create New</Link>)
                }
                
            </div>

                <div className="mt-3">
                    <div className="row">
                        {articles && articles.map((article) => (
                            <Articles key={article._id} article={article} />
                        ))}
                    </div>
                </div>
        </div>
            {/* <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
            <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
            <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div> */}
    </div>
    </>
}

export default Home