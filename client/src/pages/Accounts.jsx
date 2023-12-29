import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams, Link } from "react-router-dom";
import UsersArticles from "../components/UsersArticles";
import CreateNewArticle from "../components/CreateNewArticle";

function Accounts () {

  const {id} = useParams();
  const {user} = useContext(UserContext);
  const [articles, setArticles] = useState(null);
  useEffect(() => {
    const usersArcticles = async () => {
      try {
        const fetchArticles = await fetch (`http://localhost:8800/users-articles/${id}`);
        const json = await fetchArticles.json();
        if (fetchArticles.ok) {
          setArticles(json);
        }
      } catch (e) {
        console.error("An error occured in trying to fetch single article");
      }
    }
    usersArcticles();
  }, [id])

  return <>
    <div className="uni-padding">
      <div className="profile">
        <div className="profile__photo">
          { user && (<img src={`http://localhost:8800/images/${user.image}`} className="profile__photo--image" alt="" />) }
        </div>
        <div className="profile__details">
          {user && (
            <>
              <h4> { user.full_name } </h4>
              <p className="profile__details--email"> <span>{user.username}</span> <span>{ user.email }</span> </p>
              <Link className="profile__details--edit" to={`/accounts/${user._id}/edit-user`}> Edit Profile </Link>
            </>
          )}
        </div>
      </div>
      <div class="tab-content m-auto" id="v-pills-tabContent">
        <div class="container tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
          <div className="d-flex justify-content-between mt-3">
            <ul className="nav nav-pills">
              <li className="navItem">
                <Link className="navItem__navLink" aria-current="page">Articles</Link>
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
            </ul>

            {
              !!user && (<CreateNewArticle />)
            }
            
                
            </div>


            <div className="row">
              {articles && articles.map((article) => (
                <UsersArticles key={article._id} article={article} />
              ))}
            </div>
        </div>
        
     </div>
    </div>
  </>
}

export default Accounts