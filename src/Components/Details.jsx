import React from 'react';

// const Details = () => {
//   const user = {
//     avatar: 'https://via.placeholder.com/150',
//     name: 'Dummy',
//     caretakerName: 'Ram',
//     parentName: 'Rajesh',
//     gamesPlayed: 5,
//     progress: 40,
//     recentActions: [
//       { GameId: '#12', Game_Name: 'Connecting Letters', Status: 'Completed' },
//       { GameId: '#15', Game_Name: 'Sentence Verification', Status: 'Attempted' },
//       { GameId: '#2', Game_Name: 'Shape Matching', Status: 'Completed' },
//       { GameId: '#1', Game_Name: 'Animal Matching', Status: 'Attempted' },
//       { GameId: '#7', Game_Name: 'Joining Shapes', Status: 'Completed' },
//     ],
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
//       <div style={{ width: '30%', textAlign: 'center', marginRight: '20px' }}>
//         <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px' }}>
//           <img
//             src={user.avatar}
//             alt="Avatar"
//             style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '20px' }}
//           />
//           <h2>{user.name}</h2>
//           <p><strong>Caretaker:</strong> {user.caretakerName}</p>
//           <p><strong>Parent:</strong> {user.parentName}</p>
//           <p><strong>Games Played:</strong> {user.gamesPlayed}</p>
//           <div style={{ width: '100%', backgroundColor: '#f3f3f3', borderRadius: '5px' }}>
//             <div
//               style={{
//                 width: `${user.progress}%`,
//                 height: '24px',
//                 backgroundColor: '#007bff',
//                 borderRadius: '5px',
//                 textAlign: 'center',
//                 color: 'white'
//               }}
//             >
//               {user.progress}%
//             </div>
//           </div>
//         </div>
//       </div>
//       <div style={{ width: '60%' }}>
//         <div style={{ border: '1px solid #ddd', borderRadius: '10px' }}>
//           <div style={{ backgroundColor: '#f7f7f7', padding: '10px 20px', borderBottom: '1px solid #ddd' }}>
//             <h3>Recent Actions</h3>
//           </div>
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr>
//                 <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Game ID</th>
//                 <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Game Name</th>
//                 <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {user.recentActions.map((action, index) => (
//                 <tr key={index}>
//                   <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{action.GameId}</td>
//                   <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{action.Game_Name}</td>
//                   <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{action.Status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Details;

export default function Details() {
  return (
    <div>
      Details
    </div>
  )
}
