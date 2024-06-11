import {hashText} from "../utils/Utils_Tai";
// quy

export async function checkEmailExists(email) {
    try {
        const url = `http://localhost:8080/api/auth/checkEmailExists?email=${encodeURIComponent(email)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data.exists; // Trả về true nếu email tồn tại, false nếu không tồn tại
    } catch (error) {
        console.error('Error:', error);
    }
}

//quy
export async function addAccount(account) {
    try {
        const url = 'http://localhost:8080/api/auth/register'; // Đổi đường dẫn API
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data; // Trả về dữ liệu tài khoản đã được thêm
    } catch (error) {
        console.error('Error:', error);
    }
}


//quy
export async function checkLogin(email, password) {
    try {
        const url = 'http://localhost:8080/api/auth/login'; 
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        return data; // Trả về dữ liệu từ API
      
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export async function changePassword(email, newPassword) {
    try {
        const hashPass = hashText(newPassword);
        const url = `http://localhost:9810/api/accounts/?email=${encodeURIComponent(email)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch account data.');
        }
        const accounts = await response.json();
        const account = accounts.find((acc) => acc.email === email);
        if (!account) {
            throw new Error('Account not found.');
        }
        account.hashPass = hashPass;
        const updateResponse = await fetch(`http://localhost:9810/api/accounts/${account.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        });
        if (!updateResponse.ok) {
            throw new Error('Failed to update password.');
        }
        console.log('Password updated successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function getProvinces() {
    const url = "http://localhost:9810/api/provinces";
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
export async function loadInfo(email) {
    try {
        const url = `http://localhost:8080/api/users/${email}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch account data.');
        }
        const account = await response.json();
        if (!account) {
            throw new Error('Account not found.');
        }
        console.log('data', account);
        return account; // Trả về thông tin tài khoản đã tìm thấy
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


// export async function changeProfile(email, data) {
//     try {
//         const url = `http://localhost:8080/api/changePro5/${encodeURIComponent(email)}`;
//         const response = await fetch(url, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to update profile.');
//         }
//         console.log('Profile updated successfully!');
//         const updateResponse = await fetch(`http://localhost:8080/api/users/${email}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(account),
//         });
//         if (!updateResponse.ok) {
//             throw new Error('Failed to update profile.');
//         }
//         console.log('Profile updated successfully!');
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }

export async function changeProfile(email, data) {
    try {
        const url = `http://localhost:8080/api/changePro5/${email}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch account data.');
        }
        const account = await response.json();
        console.log('account1 ', account)
        account.fullname = data.fullname;
        account.gender = data.gender;
        account.phone = data.phone;
        account.personal_email = data.personal_email;
        account.address = data.address;
        // account.province = data.province;
        // const updateResponse = await fetch(`http://localhost:8080/api/users/${email}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(account),
        // });
        console.log('account2 ', account)
        localStorage.setItem('account', account.email);
        // if (!updateResponse.ok) {
        //     throw new Error('Failed to update profile.');
        // }
        console.log('Profile updated successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

