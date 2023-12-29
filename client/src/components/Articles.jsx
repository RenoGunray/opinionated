import { Link } from "react-router-dom"

function Articles ({article}) {
  return <>
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="postCard">
      <Link to={`post/${article._id}`} className="article-card text-dark link-defaults-off">
          <div className="postCard__cover">
            <img src={`http://localhost:8800/images/${article.photo}`} className="postCard__cover--image" alt="..." />
          </div>
          <div className="postCard__body">
              <div className="">
                  <h4 className="postCard__title"> {article.title} </h4>
                  
                  <div className="d-flex postCard__author">
                      <img src={`http://localhost:8800/images/${article.author.image}`} alt="profiles..." className="me-1 postCard__author--image"/>
                      <p className="line-height"> {article.author.username} </p>
                  </div>
                  <p className="postCard__date">{article.createdAt}</p>
              </div>
          </div>
      </Link>
      <div className="border p-1 text-center postCard__actions"><i className="fa-regular fa-thumbs-up me-2 ms-2"></i><i className="fa-regular fa-comment me-2 ms-2"></i></div>
      </div>
  </div>
  </>
}

export default Articles