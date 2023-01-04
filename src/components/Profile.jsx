import React from "react";

const Profile = ({ item, id_user }) => {
  console.log(item);
  return (
    <div>
      <p className="text-black text-lg font-semibold">
        {item[0]?.option_data?.key}
      </p>
      <ul className="list-disc pl-4">
        {item?.length > 0 &&
          item
            .filter((a) => a.user_id == +id_user)
            .map((option) => (
              <li
                key={option.id}
                className="cursor-pointer text-blue-500 hover:underline my-2 font-bold "
              >
                {option?.value}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Profile;
