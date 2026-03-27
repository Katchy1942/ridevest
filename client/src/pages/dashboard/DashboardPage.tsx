const DashboardPage = () => {
   const companyData = localStorage.getItem('company')
   const company = companyData ? JSON.parse(companyData) : null
   const companyName = company?.companyName
   return (
      <div className="text-sm">To test order creation and tracking: <a href={`http://localhost:5173/add-delivery?company=${companyName?.replace(/\s+/g, '-')}`} className="text-emerald-500">Create Order</a></div>
   )
}

export default DashboardPage