
import { useEffect, useState, useMemo } from "react";
import { fetchAllReports } from "../../services/api"; 
import { useNavigate } from "react-router-dom";



const CreateReportButton = () => (
    <button 
        className="hidden items-center space-x-2 bg-[#36E278] hover:bg-[#36e278e4] text-black font-bold cursor-pointer
         py-2 px-4 rounded-lg transition duration-150 shadow-md"
    >
        <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Create New Report</span>
    </button>
);

const KebabMenuIcon = () => (
    <svg 
        className="w-5 h-5 text-gray-400 hover:text-gray-700 cursor-pointer" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01"></path>
    </svg>
);

const ReportCard = ({ report }) => {
    const navigate = useNavigate();
    const getTypeStyles = (type) => {
        switch (type) {
            case 'omega':
                return 'bg-[#36E278] text-green-900 border-0'; 
            case 'omega-advanced':
                return 'bg-purple-100 text-purple-700 border-0';
            case 'inflammation':
                return 'bg-pink-100 text-pink-700 border-0';
            case 'general':
                return 'bg-yellow-100 text-yellow-700 border-0';
            case 'comprehensive':
                return `bg-blue-500 text-black border-0`
            default:
                return 'bg-gray-100 text-gray-700  border-0';
        }
    };
    
    const styles = getTypeStyles(report.type);

    return (
        <div onClick={()=>navigate(`/reports/${report.id}`)}
            className="p-4 cursor-pointer border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition duration-200 bg-white flex flex-col justify-between h-full"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
                <KebabMenuIcon />
            </div>

            <p className="text-sm text-gray-600 mb-4">{report.patientName || "N/A"}</p>
            
            <div className="mt-auto pt-2 flex justify-between items-center border-t border-gray-100">
                <span className={`text-xs ${styles} font-medium px-2 py-1 rounded-full border`}>
                    {report.type}
                </span>
                <span className="text-sm text-gray-500">{report.date || 'N/A'}</span>
            </div>
        </div>
    );
};


const ReportListRow = ({ report }) => {
    const navigate = useNavigate();
    const getTypeStyles = (type) => {
        switch (type) {
            case 'omega':
                return 'bg-[#36E278] text-green-900 border-0'; 
            case 'omega-advanced':
                return 'bg-purple-100 text-purple-700 border-0';
            case 'inflammation':
                return 'bg-pink-100 text-pink-700 border-0';
            case 'general':
                return 'bg-yellow-100 text-yellow-700 border-0';
            case 'comprehensive':
                return `bg-blue-500 text-black border-0`
            default:
                return 'bg-gray-100 text-gray-700  border-0';
        }
    };
    const styles = getTypeStyles(report.type);

    return (
        <div onClick={()=>navigate(`/reports/${report.id}`)} className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-100">
            <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold text-gray-800">{report.title}</h4>
                <p className="text-sm text-gray-500">{report.patientName || "N/A"}</p>
            </div>
            <div className="w-40 text-sm text-gray-600 hidden sm:block">
                <span className={`text-xs ${styles} font-medium px-2 py-1 rounded-full border`}>
                    {report.type}
                </span>
            </div>
            <div className="w-32 text-sm text-gray-500 text-right">
                {report.date || 'N/A'}
            </div>
            <div className="w-10 flex justify-end">
                <KebabMenuIcon />
            </div>
        </div>
    );
};




const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    
  
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [isGridView, setIsGridView] = useState(true); 

   
    const availableTypes = [`All`,'omega',`omega-advanced`,`inflammation`,`general`,`comprehensive`];


    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const data = await fetchAllReports();
           
            setReports(data); 
        } catch (error) {
            console.error("Failed to fetch reports:", error);
            setReports([]); 
        } finally {
            setLoading(false);
        }
    };

  
    const filteredReports = useMemo(() => {
        return reports.filter(report => {
          
            const typeMatch = selectedType === 'All' || report.type === selectedType;

            const searchLower = searchTerm.toLowerCase();
            const searchMatch = report.title.toLowerCase().includes(searchLower) ||
                                (report.patientName && report.patientName.toLowerCase().includes(searchLower));

            return typeMatch && searchMatch;
        });
    }, [reports, searchTerm, selectedType]);


    if (loading)
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600 text-lg">Loading reports...</p>
            </div>
        );


    return (
        <div className="p-6 bg-gray-50 min-h-screen"> 
            
       
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">All Reports</h2>
                    <p className="text-md text-gray-600 mt-1">
                        View, manage, and create medical reports for your patients.
                    </p>
                </div>
                <CreateReportButton />
            </div>

            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8 bg-white py-4 px-8 rounded-2xl shadow-sm">
                
               
                <div className="relative ">
                    <input
                        type="text"
                        placeholder="Search by report, patient..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-6  py-2 border bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

              
                <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full md:w-64 bg-gray-100 border border-gray-300 rounded-xl px-4 py-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                    {availableTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                
                <div className="flex space-x-2 p-1 border border-gray-300 rounded-xl bg-white">
                 
                    <button 
                        onClick={() => setIsGridView(true)}
                        className={`p-2 rounded-lg transition ${isGridView ? 'bg-[#36E278] text-black' : 'text-gray-400 hover:text-gray-700'}`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 11a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                    </button>
                
                    <button 
                        onClick={() => setIsGridView(false)}
                        className={`p-2 rounded-lg transition ${!isGridView ? 'bg-[#36E278] text-black' : 'text-gray-400 hover:text-gray-700'}`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
            </div>


          
            {filteredReports.length > 0 ? (
                <>
                  
                    {isGridView ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredReports.map((report) => (
                                <ReportCard key={report.id} report={report} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-md divide-y divide-gray-200">
                            {filteredReports.map((report) => (
                                <ReportListRow key={report.id} report={report} />
                            ))}
                        </div>
                    )}
                    
                  
                    <div className="mt-8 flex justify-end text-sm text-gray-600">
                        Showing 1 to {Math.min(filteredReports.length, 6)} of {filteredReports.length} results
                    </div>
                </>
            ) : (
               
                <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-gray-300 rounded-xl h-[400px] mt-6 bg-white">
                   
                    <div className="mb-4 text-blue-300 w-12 h-12 flex items-center justify-center">
                        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h10a2 2 0 012 2v2m-6 3l2-2 2 2m-2-2v6m-6-6v2m-2-2l2-2 2 2m-2-2v6"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        No Reports Found
                    </h3>
                    <p className="text-center text-gray-500 max-w-sm">
                        No results match your current filters or search term.
                    </p>
                </div>
            )}

        </div>
    );
};

export default Reports;