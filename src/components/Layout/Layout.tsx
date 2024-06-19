import React from 'react'
import './Layout.scss';
function Layout({children=<></>}:{children:React.ReactElement}) {
    return (
        <div className="wrap">
            <div className="container">
                
                <div className="box">
                {children}
                    <div className='smoke'>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default React.memo(Layout);