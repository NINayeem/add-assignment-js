    const todoInput = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");

    // show alert and focus input
    function showEmptyAlert(inputElement) {
      alert("Type to Hablu mama"); 
      inputElement.focus();
     
    }

    //  Add Todo
    function addTodo() {
      const text = todoInput.value.trim();
      if (text === "") {
        showEmptyAlert(todoInput);
        return;  
      }

      const li = document.createElement("li");
      li.className = "flex justify-between items-center bg-gray-800 p-3 rounded-lg shadow-md";

      const span = document.createElement("span");
      span.textContent = text;
      span.className = "flex-grow";

      const btnGroup = document.createElement("div");
      btnGroup.className = "flex gap-2";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm font-semibold";
      editBtn.onclick = () => editTodo(li, span);

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-semibold";
      delBtn.onclick = () => li.remove();

      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(delBtn);

      li.appendChild(span);
      li.appendChild(btnGroup);

      // Add new item at top (change to appendChild for bottom)
      todoList.prepend(li);

      todoInput.value = "";
      todoInput.focus();
    }

    // Function: Edit Todo
    function editTodo(li, span) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      input.className = "flex-grow p-2 rounded text-gray-900";

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.className = "bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm font-semibold";

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.className = "bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm font-semibold text-white";

      // পুরনো span কে input দিয়ে replace
      li.replaceChild(input, span);
      li.querySelector("div").innerHTML = "";
      li.querySelector("div").appendChild(saveBtn);
      li.querySelector("div").appendChild(cancelBtn);

      input.focus();
      // Save action
      saveBtn.onclick = () => {
        const newText = input.value.trim();
        if (newText === "") {
          showEmptyAlert(input);
          return;
        }
        span.textContent = newText;
        li.replaceChild(span, input);

        // edit and delet btn
        li.querySelector("div").innerHTML = "";
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit hablu maam";
        editBtn.className = "bg-green-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm font-semibold";
        editBtn.onclick = () => editTodo(li, span);

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "bg-red-500 hover:bg-red-200  px-3 py-1 rounded text-sm font-semibold borrer boreder-green-400";
        delBtn.onclick = () => li.remove();

        li.querySelector("div").appendChild(editBtn);
        li.querySelector("div").appendChild(delBtn);
      };

      // Cancel action cancel btn 
      cancelBtn.onclick = () => {
        li.replaceChild(span, input);
        li.querySelector("div").innerHTML = "";
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm font-semibold";
        editBtn.onclick = () => editTodo(li, span);

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-semibold";
        delBtn.onclick = () => li.remove();

        li.querySelector("div").appendChild(editBtn);
        li.querySelector("div").appendChild(delBtn);
      };

      // Enter key saves, Escape cancels
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") saveBtn.click();
        if (e.key === "Escape") cancelBtn.click();
      });
    }

    // Event: Add Button Click
    addBtn.addEventListener("click", addTodo);
// enter
    todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTodo();
    });