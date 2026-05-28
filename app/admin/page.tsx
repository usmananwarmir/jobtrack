const users = [
  { name: "Usman", role: "Owner", applications: 43, keyStatus: "Connected" },
  { name: "Aisha", role: "Member", applications: 17, keyStatus: "Missing" },
  { name: "Rami", role: "Reviewer", applications: 9, keyStatus: "Connected" },
];

export default function AdminPage() {
  return (
    <section className="py-10">
      <div className="glass rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
        <p className="mt-2 text-sm text-muted">
          Manage users, monitor provider key readiness, and keep team workspaces healthy.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-muted">
              <tr>
                <th className="pb-2">User</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Applications</th>
                <th className="pb-2">Provider key status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.name} className="border-t border-white/10">
                  <td className="py-3">{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.applications}</td>
                  <td>{user.keyStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
