import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";
import * as api from "../api";
import PostCard from "../components/PostCard";
import Cities from "../components/Cities";

export default function Home({posts, setPosts}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [isPostsLoading, setIsPostsLoading] = useState(true);
    const [arePostsLoadedSuccessfully, setArePostsLoadedSuccessfully] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [genderInput, setGenderInput] = useState("default");
    const [cityInput, setCityInput] = useState("default");
    const [screenWidth, setScreenWidth] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in");
        }
    }, [])

    useEffect(() => {
        setIsPostsLoading(true);
        setArePostsLoadedSuccessfully(null);
        api.getPosts()
            .then((response) => {
                setPosts(response);
                setFilteredPosts(response); //
                setIsPostsLoading(false);
                setArePostsLoadedSuccessfully(true);
            })
            .catch((error) => {
                setIsPostsLoading(false);
                setArePostsLoadedSuccessfully(false);
            })
    }, [])

    useLayoutEffect(() => {
        function updateScreenWidth() {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener("resize", updateScreenWidth);
        updateScreenWidth();
        return () => window.removeEventListener("resize", updateScreenWidth)
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleGenderInput(event) {
        setGenderInput(event.target.value);
    }

    function onClickSearchButton() {
        let postsByFilters;
        if (genderInput === "default" && cityInput !== "default") {
            postsByFilters = posts.filter((post) => {
                return post.city === cityInput;
            })
        } else if (genderInput !== "default" && cityInput === "default") {
            if (genderInput === "Either") {
                postsByFilters = posts;
            } else {
                postsByFilters = posts.filter((post) => {
                    return post.gender_of_date === genderInput;              
                })
            }
        } else if (genderInput !== "default" && cityInput !== "default") {
            if (genderInput === "Either") {
                postsByFilters = posts.filter((post) => {
                    return post.city === cityInput;              
                })
            } else {
                postsByFilters = posts.filter((post) => {
                    return post.gender_of_date === genderInput && post.city === cityInput;
                })
            }
        } else {
            postsByFilters = posts;
        }
        setFilteredPosts(postsByFilters);
    }

    function onClickResetFiltersButton() {
        setFilteredPosts(posts);
        setGenderInput("default");
        setCityInput("default");
    }

    const componentCitiesStyleHome = {
        flexDirection: screenWidth < 480 ? "column" : "row",
        alignItems: screenWidth < 480 ? "initial" : "center"
    };

    if (isPostsLoading) {
        return (
            <div className="main">
                <main>
                    <p>Loading...</p>
                </main>
            </div>
        )
    }

    if (arePostsLoadedSuccessfully === false) {
        return (
            <div className="main">
                <main>
                    <p>Posts could not be loaded.</p>
                </main>
            </div>
        )
    }

    return (
        <div className="main">
            <main>
                <h1>Browse Fake Dates</h1>
                <p>Browse posts by other users who are looking for a fake date or filter them by gender and city.</p>
                
                <form onSubmit={handleSubmit} id="home-form">
                    <div id="home-form-filters">
                        <div className="component gender">
                            <label htmlFor="gender">Seeking: </label>
                            <div>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={genderInput}
                                    onChange={handleGenderInput}>
                                        <option disabled value="default">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Either">Either</option>
                                </select>
                            </div>
                        </div>
                        <Cities cityInput={cityInput} setCityInput={setCityInput} componentCitiesStyle={componentCitiesStyleHome} />
                    </div>

                    <div className="buttons">
                        <button onClick={onClickSearchButton}>Search</button>
                        <button onClick={onClickResetFiltersButton}>Reset</button>
                    </div>
                </form>

                {arePostsLoadedSuccessfully === true && filteredPosts.length === 0
                    ? <p>No posts match your filters</p>
                    : null}

                <div id="post-cards">
                    {filteredPosts
                        ? filteredPosts.map((post) => {
                            return <PostCard key={post.post_id} post={post} />
                        })
                        : null}
                </div>            
            </main>
        </div>
    )
}