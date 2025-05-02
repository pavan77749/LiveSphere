export async function signup (req, res) {
    res.json({ message: 'Registration successful' });
}

export async function login (req, res) {
    res.json({ message: 'Login successful' });
}

export async function logout (req, res) {
    res.json({ message: 'Logout successful' });
}