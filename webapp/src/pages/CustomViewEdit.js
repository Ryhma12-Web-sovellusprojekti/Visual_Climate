import React, { useState, useEffect } from "react";
import { fsdb } from '../firebase-config';
import { collection, doc, query, where, getDocs, deleteDoc } from "firebase/firestore";
import useAuth from "../components/CustomHooks";
import GetCustomViewRootUrl from "../components/GetCustomViewRootUrl";

function CustomViewEdit({ goBack }) {
    const user = useAuth();
    const [views, setViews] = useState([]);
    const path = GetCustomViewRootUrl();

    // get current user's custom views:
    useEffect(() => {
        const getViews = async () => {
            const q = query(collection(fsdb,"customview"), where("user", "==", user.uid));
            const data = await getDocs(q);
            setViews(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getViews();
    });

    // delete custom view:
    const deleteView = async (id) => {
        const viewDoc = doc(fsdb, "customview", id)
        await deleteDoc(viewDoc);
    };

    return (
        <div>
            <button onClick={goBack}>Back</button>
            {views.map((view) => {
                return (
                    <div className="ownviews">
                        <div className="viewheader">
                            <div className="title">
                                <h1>{view.title}</h1>
                            </div>
                            <div className="deleteView">
                                <button onClick={() => deleteView(view.id)}>&#128465;</button>
                            </div>
                        </div>
                        <div className="link" >
                            {path}{view.id}
                        </div>
                        <div className="text">
                            {view.viewText}
                        </div>

                    </div>
                );
            })}

        </div>
    );
}

export default CustomViewEdit;

