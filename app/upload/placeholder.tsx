import React from 'react'
import styles from "./writePage.module.css";

function Placeholder() {
    return (
        <div className={styles.container}>
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-16 bg-slate-500 rounded"></div>
                    <div className="h-60 border border-blue-300 bg-slate-500 shadow rounded-md p-4 max-w max-h-sm w-full mx-auto">

                    </div>
                    <div className="space-y-3">
                        <div className="h-20 bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Placeholder
