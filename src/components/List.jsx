import React, { useState, useEffect } from 'react';

const List = React.memo(() => {
  const [todos, setTodos] = useState([]);     /* defined the state for managing the api data */
  const [currentPage, setCurrentPage] = useState(1);     /* this state is used to set the current page in pagination */
  const itemsPerPage = 10;   /* total items to be rendered in one page */


  /* api called in useEffect */
  useEffect(() => {
    const fakeApi = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      setTodos(data);
    };

    fakeApi();
  }, [currentPage]);


  const totalPage = Math.ceil(todos.length / itemsPerPage);  /* setting up the total page. */
  const startIndex = (currentPage - 1) * itemsPerPage;      
    const endIndex = startIndex + itemsPerPage;

  const paginationData = todos.slice(startIndex, endIndex);     /* sliced down the data according to our pagination */

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);                /* handling the pagination */
  }


  /* handling the data according to question which i got  */
  const handleChange = (id) => {
    setTodos((prevTodo) =>
      prevTodo.map((val) =>
        val.id === id ? { ...val, completed: !val.completed } : val
      )
    );
  };

  return (
    <div className="flex flex-col justify-center bg-white w-3/5 mx-auto rounded-md py-5 px-3">
      <div className="flex justify-center pb-5">
        <h1 className="font-bold text-3xl text-gray-600">ToDo List</h1>
      </div>
      <div>
        {paginationData.map((item) => (
          <div className="flex gap-x-3 justify-between border p-3 border-l" key={item.id}>
            <div className="flex h-6 items-center gap-3">
              <input
                id="check"
                name="check"
                checked={item.completed}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={() => handleChange(item.id)}
              />
              <div className="text-sm leading-6">
                <label htmlFor="check" className={`font-medium text-gray-900 ${item.completed === true ? 'line-through' : 'no-underline'}`}>
                  {item.title}
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow">{item.completed ? 'true' : 'false'}</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <div className="flex justify-between items-center gap-3 py-5">
          <p>{currentPage} of {totalPage}</p>
          <button className="bg-white text-gray-800 px-2 py-1 border border-gray-400 rounded" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev Page</button>
          <button className="bg-white text-gray-800 px-2 py-1 border border-gray-400 rounded" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPage}>Next Page</button>
        </div>
      </div>
    </div>
  );
});

export default List;
