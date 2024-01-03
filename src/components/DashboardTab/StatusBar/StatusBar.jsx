import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './StatusBar.scss';

const StatusBar = (props) => {
    const { data } = props

    return (
        <div className="d-flex flex-row row">
            <div className="col d-flex flex-column dashboard-tab-card">
                <div className="dashboard-tab-card-title">
                    <ClassIcon className="dashboard-tab-card-icon" />
                    <span className="dashboard-tab-card-key">Tổng số lớp</span>
                </div>
                <div className="dashboard-tab-card-value">{data.total_class}</div>
            </div>
            <div className="col d-flex flex-column dashboard-tab-card">
                <div className="dashboard-tab-card-title">
                    <SchoolIcon className="dashboard-tab-card-icon" />
                    <span className="dashboard-tab-card-key">Tổng số học sinh</span>
                </div>
                <div className="dashboard-tab-card-value">{data.total_student}</div>
            </div>
            <div className="col d-flex flex-column dashboard-tab-card">
                <div className="dashboard-tab-card-title">
                    <AssignmentIcon className="dashboard-tab-card-icon" />
                    <span className="dashboard-tab-card-key">Tổng số bài thi</span>
                </div>
                <div className="dashboard-tab-card-value">{data.total_exam}</div>
            </div>
            <div className="col d-flex flex-column dashboard-tab-card">
                <div className="dashboard-tab-card-title">
                    <AssignmentIcon className="dashboard-tab-card-icon" />
                    <span className="dashboard-tab-card-key">Tổng số lượt thi</span>
                </div>
                <div className="dashboard-tab-card-value">{data.total_joined_exam}</div>
            </div>
            <div className="col d-flex flex-column dashboard-tab-card">
                <div className="dashboard-tab-card-title">
                    <CheckCircleIcon className="dashboard-tab-card-icon" />
                    <span className="dashboard-tab-card-key">Điểm trung bình</span>
                </div>
                <div className="dashboard-tab-card-value">{data.avg_score}</div>
            </div>
        </div>
    );
}

export default StatusBar;