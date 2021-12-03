import styles from './MainPage.module.scss';
import React from 'react';

import LeftBlock from "./LeftBlock/LeftBlock";
import MainBlock from "./MainBlock/MainBlock";

function MainPage() {
    return (
        <div>
            <LeftBlock/>
            <MainBlock/>
        </div>
    )
}

export default MainPage;