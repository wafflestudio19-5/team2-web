import styles from "./RightBlock.module.scss"

function RightBlock() {
    return (
        <div className={styles.RightBlock}>
            <div className={styles.RightInside}>
                <form className={styles.SearchLabel} action="">
                    <label >
                        돋보기<input type="text"/>
                    </label>
                </form>
                <div className={styles.TrendsWrapper}>
                    <div className={styles.TrendHeader}>
                        <span>Trends for you</span>
                        <span>아이콘</span>
                    </div>
                    <div className={styles.Trend}>Trend1</div>
                    <div className={styles.Trend}>Trend2</div>
                    <div className={styles.Trend}>Trend3</div>
                    <div className={styles.Trend}>Trend4</div>
                    <div className={styles.TrendFooter}>
                        <span>Show more</span>
                    </div>
                </div>
                <div className={styles.WhoToFollowWrapper}>
                    <div className={styles.WhoToFollowHeader}>
                        <span>Who to follow</span>
                    </div>
                    <div className={styles.Trend}>Follow1</div>
                    <div className={styles.Trend}>Follow2</div>
                    <div className={styles.TrendHeader}>
                        <span>Show more</span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default RightBlock;