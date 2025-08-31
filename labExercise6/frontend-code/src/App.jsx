import { useState } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Sample Item', description: 'This is a sample item', quantity: 5 },
    { id: 2, name: 'Another Item', description: 'This is another sample item', quantity: 3 }
  ])
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name.trim() || !formData.description.trim() || !formData.quantity) {
      alert('Please fill in all fields')
      return
    }

    if (formData.quantity <= 0) {
      alert('Quantity must be greater than 0')
      return
    }

    // Add new item
    const newItem = {
      id: Date.now(), // Simple ID generation
      name: formData.name.trim(),
      description: formData.description.trim(),
      quantity: parseInt(formData.quantity)
    }

    setItems(prev => [...prev, newItem])
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      quantity: ''
    })
  }

  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="app-container">
      <h1>Item Manager</h1>
      
      <div className="main-content">
        {/* Left side - Item List */}
        <div className="list-section">
          <h2>Items List</h2>
          {items.length === 0 ? (
            <p className="empty-message">No items yet. Add some using the form!</p>
          ) : (
            <div className="items-list">
              {items.map(item => (
                <div key={item.id} className="item-card">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                      aria-label="Delete item"
                    >
                      ×
                    </button>
                  </div>
                  <p className="item-description">{item.description}</p>
                  <div className="item-quantity">
                    <span className="quantity-label">Quantity:</span>
                    <span className="quantity-value">{item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Add Form */}
        <div className="form-section">
          <h2>Add New Item</h2>
          <form onSubmit={handleSubmit} className="item-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter item name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter item description"
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                min="1"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
