import React, { useState } from 'react';
import { BookOpen, Users, BookMarked, BarChart3, Plus, Edit2, Trash2, Search, X, Menu } from 'lucide-react'; // Added Menu

// Dummy Data
const initialBooks = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', totalCopies: 3, availableCopies: 2, description: 'A classic American novel set in the Jazz Age' },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', totalCopies: 2, availableCopies: 1, description: 'A gripping tale of racial injustice' },
  { id: '3', title: '1984', author: 'George Orwell', isbn: '9780451524935', totalCopies: 4, availableCopies: 3, description: 'A dystopian social science fiction novel' },
  { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', totalCopies: 2, availableCopies: 2, description: 'A romantic novel of manners' },
  { id: '5', title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '9780316769488', totalCopies: 3, availableCopies: 3, description: 'A story about teenage rebellion' },
  { id: '6', title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', isbn: '9780590353427', totalCopies: 5, availableCopies: 4, description: 'A young wizard\'s adventure begins' },
  { id: '7', title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227', totalCopies: 3, availableCopies: 2, description: 'An unexpected journey' },
  { id: '8', title: 'Brave New World', author: 'Aldous Huxley', isbn: '9780060850524', totalCopies: 2, availableCopies: 1, description: 'A dystopian novel about a futuristic society' }
];

const initialMembers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '+1234567890', address: '123 Main St, City', joinedDate: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1234567891', address: '456 Oak Ave, City', joinedDate: '2024-02-20' },
  { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '+1234567892', address: '789 Pine Rd, City', joinedDate: '2024-03-10' },
  { id: '4', name: 'Alice Williams', email: 'alice.w@example.com', phone: '+1234567893', address: '321 Elm St, City', joinedDate: '2024-04-05' },
  { id: '5', name: 'Charlie Brown', email: 'charlie.b@example.com', phone: '+1234567894', address: '654 Maple Dr, City', joinedDate: '2024-05-12' },
  { id: '6', name: 'Diana Prince', email: 'diana.p@example.com', phone: '+1234567895', address: '987 Cedar Ln, City', joinedDate: '2024-06-18' },
  { id: '7', name: 'Edward Norton', email: 'edward.n@example.com', phone: '+1234567896', address: '147 Birch Ct, City', joinedDate: '2024-07-22' }
];

const initialBorrowedBooks = [
  { id: '1', bookId: '1', memberId: '1', bookTitle: 'The Great Gatsby', memberName: 'John Doe', borrowedDate: '2024-10-15', dueDate: '2024-10-29', status: 'borrowed' },
  { id: '2', bookId: '2', memberId: '2', bookTitle: 'To Kill a Mockingbird', memberName: 'Jane Smith', borrowedDate: '2024-10-20', dueDate: '2024-11-03', status: 'borrowed' },
  { id: '3', bookId: '7', memberId: '4', bookTitle: 'The Hobbit', memberName: 'Alice Williams', borrowedDate: '2024-10-25', dueDate: '2024-11-08', status: 'borrowed' },
  { id: '4', bookId: '6', memberId: '5', bookTitle: 'Harry Potter', memberName: 'Charlie Brown', borrowedDate: '2024-10-18', dueDate: '2024-11-01', status: 'borrowed' },
  { id: '5', bookId: '8', memberId: '6', bookTitle: 'Brave New World', memberName: 'Diana Prince', borrowedDate: '2024-10-12', dueDate: '2024-10-26', status: 'overdue' },
  { id: '6', bookId: '3', memberId: '1', bookTitle: '1984', memberName: 'John Doe', borrowedDate: '2024-09-15', dueDate: '2024-09-29', returnedDate: '2024-09-28', status: 'returned' },
  { id: '7', bookId: '4', memberId: '3', bookTitle: 'Pride and Prejudice', memberName: 'Bob Johnson', borrowedDate: '2024-09-20', dueDate: '2024-10-04', returnedDate: '2024-10-03', status: 'returned' }
];

// Sidebar Component
const Sidebar = ({ activePage, setActivePage, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'borrowed', label: 'Borrowed Books', icon: BookMarked }
  ];

  return (
    <div
      className={`w-64 bg-indigo-900 text-white h-screen fixed left-0 top-0 overflow-y-auto z-30 transition-transform duration-300 ease-in-out transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-8 h-8" />
          Library System
        </h1>
        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden text-white hover:text-indigo-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="mt-6">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                setSidebarOpen(false); // Close sidebar on selection (for mobile)
              }}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                activePage === item.id ? 'bg-indigo-700 border-l-4 border-white' : 'hover:bg-indigo-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// Dashboard Page
const Dashboard = ({ books, members, borrowedBooks }) => {
  const stats = {
    totalBooks: books.length,
    totalMembers: members.length,
    currentlyBorrowed: borrowedBooks.filter(b => b.status === 'borrowed').length,
    availableCopies: books.reduce((sum, book) => sum + book.availableCopies, 0),
    overdueBooks: borrowedBooks.filter(b => b.status === 'overdue').length
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
      
      {/* Stats Grid - Already responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Books</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalBooks}</p>
            </div>
            <BookOpen className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Members</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalMembers}</p>
            </div>
            <Users className="w-12 h-12 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Currently Borrowed</p>
              <p className="text-3xl font-bold text-gray-800">{stats.currentlyBorrowed}</p>
            </div>
            <BookMarked className="w-12 h-12 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Overdue Books</p>
              <p className="text-3xl font-bold text-gray-800">{stats.overdueBooks}</p>
            </div>
            <BookMarked className="w-12 h-12 text-red-500" />
          </div>
        </div>
      </div>

      {/* Recent/Popular Grid - Already responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Borrowed Books</h3>
          <div className="space-y-3">
            {borrowedBooks.filter(b => b.status === 'borrowed').slice(0, 5).map(book => (
              <div key={book.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-semibold text-gray-800">{book.bookTitle}</p>
                  <p className="text-sm text-gray-600">{book.memberName}</p>
                </div>
                <span className={`px-3 py-1 rounded text-sm ${
                  book.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {book.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Books</h3>
          <div className="space-y-3">
            {books.slice(0, 5).map(book => (
              <div key={book.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-semibold text-gray-800">{book.title}</p>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="font-bold text-indigo-600">{book.availableCopies}/{book.totalCopies}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Books Page
const BooksPage = ({ books, setBooks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '', author: '', isbn: '', description: '', totalCopies: 1, availableCopies: 1
  });

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBook) {
      setBooks(books.map(b => b.id === editingBook.id ? { ...formData, id: editingBook.id } : b));
    } else {
      setBooks([...books, { ...formData, id: String(Date.now()) }]);
    }
    setShowModal(false);
    setEditingBook(null);
    setFormData({ title: '', author: '', isbn: '', description: '', totalCopies: 1, availableCopies: 1 });
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData(book);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(b => b.id !== id));
    }
  };

  return (
    <div>
      {/* Header section - make flex-col on small screens */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Books Management</h2>
        <button
          onClick={() => {
            setShowModal(true);
            setEditingBook(null);
            setFormData({ title: '', author: '', isbn: '', description: '', totalCopies: 1, availableCopies: 1 });
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5" /> Add Book
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table Wrapper - Added overflow-x-auto for mobile scrolling */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-[700px]"> {/* Added min-w to ensure table has width */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ISBN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available/Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBooks.map(book => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 max-w-xs"> {/* Added max-w for better wrapping */}
                  <div>
                    <p className="font-semibold text-gray-800 truncate">{book.title}</p>
                    <p className="text-sm text-gray-500 truncate">{book.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-800">{book.author}</td>
                <td className="px-6 py-4 text-gray-600">{book.isbn}</td>
                <td className="px-6 py-4">
                  <span className={`font-semibold ${book.availableCopies === 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {book.availableCopies}/{book.totalCopies}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(book)} className="text-blue-600 hover:text-blue-800">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(book.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Already responsive */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{editingBook ? 'Edit Book' : 'Add Book'}</h3>
              <button onClick={() => setShowModal(false)}><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="ISBN"
                value={formData.isbn}
                onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Total Copies"
                  value={formData.totalCopies}
                  onChange={(e) => setFormData({...formData, totalCopies: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg"
                  min="1"
                  required
                />
                <input
                  type="number"
                  placeholder="Available"
                  value={formData.availableCopies}
                  onChange={(e) => setFormData({...formData, availableCopies: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg"
                  min="0"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                {editingBook ? 'Update' : 'Add'} Book
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Members Page
const MembersPage = ({ members, setMembers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', joinedDate: new Date().toISOString().split('T')[0]
  });

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? { ...formData, id: editingMember.id } : m));
    } else {
      setMembers([...members, { ...formData, id: String(Date.now()) }]);
    }
    setShowModal(false);
    setEditingMember(null);
    setFormData({ name: '', email: '', phone: '', address: '', joinedDate: new Date().toISOString().split('T')[0] });
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData(member);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Members Management</h2>
        <button
          onClick={() => {
            setShowModal(true);
            setEditingMember(null);
            setFormData({ name: '', email: '', phone: '', address: '', joinedDate: new Date().toISOString().split('T')[0] });
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5" /> Add Member
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table Wrapper - Added overflow-x-auto for mobile scrolling */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMembers.map(member => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 max-w-xs">
                  <div>
                    <p className="font-semibold text-gray-800 truncate">{member.name}</p>
                    <p className="text-sm text-gray-500 truncate">{member.address}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-800">{member.email}</td>
                <td className="px-6 py-4 text-gray-600">{member.phone}</td>
                <td className="px-6 py-4 text-gray-600">{member.joinedDate}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(member)} className="text-blue-600 hover:text-blue-800">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Already responsive */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{editingMember ? 'Edit Member' : 'Add Member'}</h3>
              <button onClick={() => setShowModal(false)}><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
              />
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                {editingMember ? 'Update' : 'Add'} Member
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Borrowed Books Page
const BorrowedBooksPage = ({ borrowedBooks, setBorrowedBooks, books, members }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    bookId: '', 
    memberId: '', 
    borrowedDate: new Date().toISOString().split('T')[0], 
    dueDate: ''
  });

  const filteredBorrowed = borrowedBooks.filter(b => 
    b.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.memberName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBorrow = (e) => {
    e.preventDefault();
    const book = books.find(b => b.id === formData.bookId);
    const member = members.find(m => m.id === formData.memberId);
    
    if (!book || !member) {
      // Simple validation, you might want to show an error
      return;
    }

    const newBorrow = {
      id: String(Date.now()),
      bookId: formData.bookId,
      memberId: formData.memberId,
      bookTitle: book.title,
      memberName: member.name,
      borrowedDate: formData.borrowedDate,
      dueDate: formData.dueDate,
      status: 'borrowed'
    };
    
    setBorrowedBooks([...borrowedBooks, newBorrow]);
    setShowModal(false);
    setFormData({ 
      bookId: '', 
      memberId: '', 
      borrowedDate: new Date().toISOString().split('T')[0], 
      dueDate: '' 
    });
  };

  const handleReturn = (id) => {
    setBorrowedBooks(borrowedBooks.map(b => 
      b.id === id ? { 
        ...b, 
        returnedDate: new Date().toISOString().split('T')[0], 
        status: 'returned' 
      } : b
    ));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Borrowed Books</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5" /> Borrow Book
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search borrowed books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table Wrapper - Added overflow-x-auto for mobile scrolling */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Borrowed Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBorrowed.map(borrowed => (
              <tr key={borrowed.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-800">{borrowed.bookTitle}</td>
                <td className="px-6 py-4 text-gray-800">{borrowed.memberName}</td>
                <td className="px-6 py-4 text-gray-600">{borrowed.borrowedDate}</td>
                <td className="px-6 py-4 text-gray-600">{borrowed.dueDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    borrowed.status === 'returned' ? 'bg-green-100 text-green-800' :
                    borrowed.status === 'overdue' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {borrowed.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {borrowed.status === 'borrowed' && (
                    <button
                      onClick={() => handleReturn(borrowed.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                    >
                      Return
                    </button>
                  )}
                  {borrowed.status === 'overdue' && (
                    <button
                      onClick={() => handleReturn(borrowed.id)}
                      className="bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 text-sm"
                    >
                      Return
                    </button>
                  )}
                  {borrowed.status === 'returned' && (
                    <span className="text-gray-500 text-sm">
                      Returned on {borrowed.returnedDate}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Already responsive */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Borrow Book</h3>
              <button onClick={() => setShowModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleBorrow} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Book
                </label>
                <select
                  value={formData.bookId}
                  onChange={(e) => setFormData({...formData, bookId: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a book</option>
                  {books.filter(b => b.availableCopies > 0).map(book => (
                    <option key={book.id} value={book.id}>
                      {book.title} - {book.author} ({book.availableCopies} available)
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Member
                </label>
                <select
                  value={formData.memberId}
                  onChange={(e) => setFormData({...formData, memberId: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a member</option>
                  {members.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name} - {member.email}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Borrowed Date
                </label>
                <input
                  type="date"
                  value={formData.borrowedDate}
                  onChange={(e) => setFormData({...formData, borrowedDate: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Borrow Book
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
export default function LibraryManagementSystem() {
  const [activePage, setActivePage] = useState('dashboard');
  const [books, setBooks] = useState(initialBooks);
  const [members, setMembers] = useState(initialMembers);
  const [borrowedBooks, setBorrowedBooks] = useState(initialBorrowedBooks);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      {/* Overlay for mobile */}
      <div 
        onClick={() => setSidebarOpen(false)} 
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      />

      {/* Main Content Area */}
      {/* Takes full width on mobile, has margin on desktop */}
      <div className="flex-1 md:ml-64">
        
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10">
          <h2 className="text-xl font-bold text-indigo-900">Library System</h2>
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-indigo-900" />
          </button>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-8">
          {activePage === 'dashboard' && (
            <Dashboard books={books} members={members} borrowedBooks={borrowedBooks} />
          )}
          {activePage === 'books' && (
            <BooksPage books={books} setBooks={setBooks} />
          )}
          {activePage === 'members' && (
            <MembersPage members={members} setMembers={setMembers} />
          )}
          {activePage === 'borrowed' && (
            <BorrowedBooksPage 
              borrowedBooks={borrowedBooks} 
              setBorrowedBooks={setBorrowedBooks}
              books={books}
              members={members}
            />
          )}
        </div>
      </div>
    </div>
  );
}