import React from "react";
import { useParams } from "react-router-dom";
// import Articles from "../dummyData";
import { useEffect, useState } from "react";
import Arguments from "../components/Arguments";
import ArgueForm from "../components/ArgueForm";

const Single = () => {
    const {id} = useParams();
    // const articles = Articles.find((article) => article.id === parseInt(id));
    const [single, setSingle] = useState('');
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const singleArticle = await fetch(`http://localhost:8800/single-article/${id}`);
                const json = await singleArticle.json();
                console.log(json);
                if (singleArticle.ok) {
                    setSingle(json);
                }
            } catch (e) {
                console.error("An error occured in trying to fetch single article");
            }
        }
        fetchArticle();
    }, [id])


    const [args, setArgs] = useState('');
  console.log(id);

  useEffect(() => {
    const fetch_args = async () => {
      try {
        const fetching = await fetch(`http://localhost:8800/arguments-assoc/${id}`);
        const json = await fetching.json();
        console.log(json);
        if (fetching.ok) {
          setArgs(json);
        }
      } catch (e) {
        console.error("An error occured in trying to fetch Args");
      }
    }
    fetch_args();
  }, [id])


  const navSlide = () => {
    const navSide = document.querySelector('.argSide');
    const navSideLinks = document.querySelectorAll('.argSide .arg-links');
    console.log(navSide, navSideLinks);
    navSide.classList.toggle('argSide-active');
  }


    return (<>
    <div className="pt-5 pb-5">
    {single && (
        <>
        <div className="readCard m-auto">
            <div className="card">
                <div className="titleSection">
                    <img src={ `http://localhost:8800/images/${single.photo}` } alt="" className="titleSection__image" />
                    <div className="cover">
                        <h4 className="cover__title"> {single.title} <span className="cover__title--name"> <span className="by">by:</span> {single.author.username}</span> <span className="cover__title--date"> {single.createdAt} </span> </h4>
                        <div className="cover__btnlayout d-flex">
                            <button className="cover__btnlayout--button me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fa-solid fa-reply"></i> Argue</button>
                            <button className="cover__btnlayout--button arg-btn" onClick={navSlide}>Arguments</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    {/* <p className="card-text line-height"> {single.body} </p> */}
                    <div dangerouslySetInnerHTML={{__html: single.body}} />
                </div>
            </div>
        </div>
        </>
    )}

        <div className="argSide border pt-5">
            <Arguments args={args} />
        </div>
    </div>

        {/**Modal argue form */}
        
        <ArgueForm art_id={id} />

    </>)
}

export default Single