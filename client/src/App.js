import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import CreateRecipe from "./components/createRecipe/CreateRecipe";
import EditRecipe from "./components/editRecipe/EditRecipe";
import Home from "./pages/home/Home";
import RequireUser from "./components/RequireUser";
import RecipeFeed from "./components/recipeFeed/RecipeFeed";
import Recipes from "./components/recipes/Recipes";
import SingleRecipe from "./components/singleRecipe/SingleRecipe";
import UserHome from "./pages/userHome/UserHome";
import About from "./components/about/About";

import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import OnlyIfNotLoggedIn from "./components/OnlyIfNotLoggedIn";

function App() {
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const loadingRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  return (
    <div className="App">
      <LoadingBar color="#f11946" ref={loadingRef} />
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<RecipeFeed />} />
            {/* <Route path="/" element={<Recipes />} /> */}
            <Route path="/create" element={<CreateRecipe />} />
            <Route path="/edit/:recipeId" element={<EditRecipe />} />
          </Route>
        </Route>

        <Route element={<OnlyIfNotLoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<UserHome />}>
          <Route path="/recipes" element={<Recipes />} />
          {/* <Route path="/recipes" element={<RecipeFeed />} /> */}
          <Route path="/recipe/:recipeId" element={<SingleRecipe />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* add contact form, about the user etc */}
      </Routes>
    </div>
  );
}

export default App;
