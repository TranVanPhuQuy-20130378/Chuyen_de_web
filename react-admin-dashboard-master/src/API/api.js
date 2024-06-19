export async function getUsers() {
    try {
        const response = await fetch('http://localhost:8080/api/users');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
export async function deleteUser(id) {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorDetails = await response.json(); // Xử lý JSON khi có lỗi
        console.error('Failed to delete user:', errorDetails);
        throw new Error('Failed to delete user');
      }
  
    
      
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  export async function getOrder() {
    try {
      const response = await fetch(`http://localhost:8080/api/order/all`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }