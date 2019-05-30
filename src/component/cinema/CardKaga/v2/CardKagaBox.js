import React from 'react'
const CardKagaBox = props => {
    console.log(props)
    return (
        <>
            <a
                key={props.cinemaid}
                className="col-3 flex-column aCardText position-relative"
                href={'/cinema/' + props.cinemaid}
            >
                {/* 外框＋底圖 */}
                <div
                    className="card text-center flex-column border-0"
                    style={{
                        backgroundImage: `url(${props.img})`,
                        // 下方style轉放scss
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        height: '390px',
                        borderRadius: '5px',
                        overflow: 'hidden',
                    }}
                >
                    {/* 上方淺色遮罩 */}
                    <div
                        className=" h-100 text-right pr-1"
                        // 下方style轉放scss
                        style={{
                            background: 'rgba(0, 0, 0, 0.2)',
                        }}
                    />
                    {/* 下方深色遮罩 */}
                    <div
                        className="card-body h-30 align-items-center py-4"
                        // 下方style轉放scss
                        style={{ background: 'rgba(0, 0, 0, 0.8)' }}
                    >
                        {/* 下方遮罩內文字 */}
                        <h6 className="card-title mb-1">{props.subtitle}</h6>
                        <h4 className="card-title m-0">{props.title}</h4>
                    </div>
                </div>
            </a>
        </>
    )
}
export default CardKagaBox
