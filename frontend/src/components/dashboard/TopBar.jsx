import { useProfile } from "../../utils/context/useProfile"

const TopBar = () => {
    const {user} = useProfile();
  return (
    <div className="w-full h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">

      {/* TITLE */}
      <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
        Dashboard
      </h1>

      {/* USER */}
      {user && (
        <div className="flex items-center gap-3">

          {/* Info */}
          <div className="text-right leading-tight">
            <p className="font-semibold text-sm text-gray-800">
              {user.nom}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user.role === "admin"
                ? "Administrateur"
                : user.role?.toLowerCase()}
            </p>
          </div>

          {/* Avatar */}
          <div className="w-10 h-10 bg-yellow-500 text-black rounded-full flex items-center justify-center font-bold shadow-md hover:scale-105 transition">
            {user?.nom?.charAt(0)?.toUpperCase()}
          </div>

        </div>
      )}

    </div>
  )
}

export default TopBar