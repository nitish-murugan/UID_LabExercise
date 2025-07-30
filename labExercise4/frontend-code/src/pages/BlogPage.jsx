import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../components/BlogViewer/BlogViewer.module.css';

const BlogPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const fetchRecentPosts = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response.data.posts || response.data);
      } catch {
        console.log('Backend not available, using mock data');
        const mockPosts = [
        {
          id: 1,
          title: 'Getting Started with React Hooks',
          content: 'React Hooks revolutionized the way we write React components. They allow you to use state and other React features without writing a class component. In this comprehensive guide, we will explore the most commonly used hooks like useState, useEffect, useContext, and many more. We will also dive into custom hooks and how they can help you write more reusable and maintainable code.',
          excerpt: 'React Hooks revolutionized the way we write React components. They allow you to use state and other React features...',
          author: 'John Doe',
          authorAvatar: 'JD',
          category: 'Technology',
          publishedAt: '2024-01-20',
          readTime: '5 min read',
          views: 1250,
          likes: 45,
          comments: 12,
          image: null
        },
        {
          id: 2,
          title: 'Understanding CSS Grid Layout',
          content: 'CSS Grid is a two-dimensional layout system for the web. It lets you lay out items in rows and columns, making it easier to design complex responsive layouts. Unlike Flexbox, which is largely a one-dimensional system, Grid is optimized for two-dimensional layouts. In this article, we will cover the fundamentals of CSS Grid, including grid containers, grid items, grid lines, and grid areas.',
          excerpt: 'CSS Grid is a two-dimensional layout system for the web. It lets you lay out items in rows and columns...',
          author: 'Jane Smith',
          authorAvatar: 'JS',
          category: 'Design',
          publishedAt: '2024-01-19',
          readTime: '7 min read',
          views: 980,
          likes: 32,
          comments: 8,
          image: null
        },
        {
          id: 3,
          title: 'JavaScript ES6 Features Every Developer Should Know',
          content: 'ECMAScript 6 (ES6), also known as ECMAScript 2015, introduced many new features that made JavaScript more powerful and easier to work with. From arrow functions to destructuring, template literals to modules, ES6 has transformed how we write JavaScript. This article covers the most important ES6 features with practical examples and use cases.',
          excerpt: 'ECMAScript 6 introduced many new features that made JavaScript more powerful and easier to work with...',
          author: 'Mike Johnson',
          authorAvatar: 'MJ',
          category: 'Technology',
          publishedAt: '2024-01-18',
          readTime: '6 min read',
          views: 1100,
          likes: 38,
          comments: 15,
          image: null
        },
        {
          id: 4,
          title: 'The Art of User Experience Design',
          content: 'User Experience (UX) design is about creating products that provide meaningful and relevant experiences to users. This involves the design of the entire process of acquiring and integrating the product, including aspects of branding, design, usability, and function. Good UX design makes products not just usable, but delightful to use.',
          excerpt: 'User Experience design is about creating products that provide meaningful and relevant experiences...',
          author: 'Sarah Wilson',
          authorAvatar: 'SW',
          category: 'Design',
          publishedAt: '2024-01-17',
          readTime: '8 min read',
          views: 750,
          likes: 28,
          comments: 6,
          image: null
        },
        {
          id: 5,
          title: 'Building Scalable Web Applications',
          content: 'Scalability is a crucial consideration when building web applications. As your user base grows, your application needs to handle increased load without compromising performance. This article explores various strategies for building scalable web applications, including architectural patterns, database optimization, caching strategies, and load balancing.',
          excerpt: 'Scalability is crucial when building web applications. Learn strategies for handling increased load...',
          author: 'David Brown',
          authorAvatar: 'DB',
          category: 'Technology',
          publishedAt: '2024-01-16',
          readTime: '10 min read',
          views: 1350,
          likes: 52,
          comments: 20,
          image: null
        }
      ];
      setPosts(mockPosts);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    fetchRecentPosts();
  }, [fetchRecentPosts, navigate]);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...new Set(posts.map(post => post.category))];

  const openPostModal = (post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const closePostModal = () => {
    setSelectedPost(null);
    setShowPostModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={styles.blogViewer}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading recent posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.blogViewer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Blog Posts</h1>
        <p className={styles.subtitle}>Discover amazing stories and insights</p>
      </div>

      {/* Search and Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.categoryFilter}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.active : ''
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className={styles.postsGrid}>
        {filteredPosts.length === 0 ? (
          <div className={styles.noPosts}>
            <p>No posts found matching your criteria.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <article key={post.id} className={styles.postCard}>
              {post.image && (
                <div className={styles.postImage}>
                  <img src={post.image} alt={post.title} />
                </div>
              )}
              
              <div className={styles.postContent}>
                <div className={styles.postMeta}>
                  <span className={styles.category}>{post.category}</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
                
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                
                <div className={styles.postFooter}>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorAvatar}>
                      {post.authorAvatar}
                    </div>
                    <div className={styles.authorDetails}>
                      <span className={styles.authorName}>{post.author}</span>
                      <span className={styles.publishDate}>
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.postStats}>
                    <span className={styles.stat}>
                      👁 {post.views}
                    </span>
                    <span className={styles.stat}>
                      ❤ {post.likes}
                    </span>
                    <span className={styles.stat}>
                      💬 {post.comments}
                    </span>
                  </div>
                </div>
                
                <button 
                  className={styles.readMoreButton}
                  onClick={() => openPostModal(post)}
                >
                  Read More
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Post Modal */}
      {showPostModal && selectedPost && (
        <div className={styles.modalOverlay} onClick={closePostModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closePostModal}>
              ×
            </button>
            
            <div className={styles.modalHeader}>
              <span className={styles.modalCategory}>{selectedPost.category}</span>
              <h2 className={styles.modalTitle}>{selectedPost.title}</h2>
              
              <div className={styles.modalMeta}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorAvatar}>
                    {selectedPost.authorAvatar}
                  </div>
                  <div className={styles.authorDetails}>
                    <span className={styles.authorName}>{selectedPost.author}</span>
                    <span className={styles.publishDate}>
                      {formatDate(selectedPost.publishedAt)} • {selectedPost.readTime}
                    </span>
                  </div>
                </div>
                
                <div className={styles.postStats}>
                  <span className={styles.stat}>👁 {selectedPost.views}</span>
                  <span className={styles.stat}>❤ {selectedPost.likes}</span>
                  <span className={styles.stat}>💬 {selectedPost.comments}</span>
                </div>
              </div>
            </div>
            
            {selectedPost.image && (
              <div className={styles.modalImage}>
                <img src={selectedPost.image} alt={selectedPost.title} />
              </div>
            )}
            
            <div className={styles.modalBody}>
              <p>{selectedPost.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
