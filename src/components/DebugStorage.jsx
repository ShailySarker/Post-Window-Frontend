// // src/components/StorageDebugger.js
// import React from 'react';

// const StorageDebugger = () => {
//   const debugStorage = () => {
//     try {
//       const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
//       const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
      
//       console.group('Storage Debug');
//       console.log('All Users:', allUsers);
//       console.log('Current User:', currentUser);
//       console.groupEnd();
      
//       alert(`Storage State:
// All Users: ${allUsers.length} registered
// Current User: ${currentUser?.email || 'Not logged in'}`);
//     } catch (error) {
//       console.error('Debug error:', error);
//       alert('Error reading storage');
//     }
//   };

//   const clearStorage = () => {
//     if (window.confirm('Clear all auth data?')) {
//       localStorage.removeItem('allUsers');
//       localStorage.removeItem('currentUser');
//       alert('Storage cleared!');
//       window.location.reload();
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 flex flex-col gap-2">
//       <button
//         onClick={debugStorage}
//         className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg"
//       >
//         Debug Storage
//       </button>
//       <button
//         onClick={clearStorage}
//         className="bg-red-500 text-white px-4 py-2 rounded shadow-lg"
//       >
//         Clear Storage
//       </button>
//     </div>
//   );
// };

// export default StorageDebugger;