import './StatusBar.scss';

const StatusBar = () => {


    return (
        <div className='d-flex flex-row row'>
            <div className='col'>
                <div className='d-flex flex-row row'>
                    <div className='col class-status-item'>
                        <div className='class-status-item-title'>Tổng số lớp</div>
                        <div className='d-flex flex-row justify-content-between class-status-item-values'>
                            <div className='class-status-item-value-item'>10</div>
                            <div className='class-status-item-value-item'></div>
                        </div>
                    </div>
                    <div className='col class-status-item'>
                        <div className='class-status-item-title'>Số lớp đã tham gia</div>
                        <div className='d-flex flex-row justify-content-between class-status-item-values'>
                            <div className='class-status-item-value-item'>6</div>
                            <div className='class-status-item-value-item'>100%</div>
                        </div>
                    </div>
                </div>         
            </div>
            <div className='col'>
                <div className='d-flex flex-row row'>
                    <div className='col class-status-item'>
                        <div className='class-status-item-title'>Số lớp đang học</div>
                        <div className='d-flex flex-row justify-content-between class-status-item-values'>
                            <div className='class-status-item-value-item'>4</div>
                            <div className='class-status-item-value-item'>{(4 * 100 / 6).toFixed(2)}%</div>
                        </div>
                    </div>
                    <div className='col class-status-item'>
                        <div className='class-status-item-title'>Số lớp hoàn thành</div>
                        <div className='d-flex flex-row justify-content-between class-status-item-values'>
                            <div className='class-status-item-value-item'>2</div>
                            <div className='class-status-item-value-item'>{(2 * 100/6).toFixed(2)}%</div>
                        </div>
                    </div>
                </div>            
            </div>        
        </div>
    );
}

export default StatusBar;