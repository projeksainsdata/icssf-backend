export default function generatePayload(user) {
  if (user.role === "client") {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      phone: user.phone,
      profile: user.profile,
      location: user.location,
    };
  } else {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      phone: user.phone,
      profile: user.profile,
      location: user.location,
      description: user.description,
    };
  }
}
