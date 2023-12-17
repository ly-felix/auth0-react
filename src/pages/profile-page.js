import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";

export const ProfilePage = () => {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }
  const { Client } = require('pg');

  const conString = "postgres://iteekdcl:QD3jE70O5SdYQ1lmR1goPefoI-GjZu6n@bubble.db.elephantsql.com/iteekdcl";
  const client = new Client({
    connectionString: conString
  });

  client.connect((err) => {
    if (err) {
      console.error('Could not connect to PostgreSQL:', err);
      return;
    }

    // Replace 'your_table_name' with the actual table name you want to count rows for
    const query = 'SELECT COUNT(*) FROM users';

    client.query(query, (err, result) => {
      if (err) {
        console.error('Error running query:', err);
        client.end();
        return;
      }

      const rowCount = result.rows[0].count;
      console.log(`Number of rows: ${rowCount}`);

      client.end();
    });
  });

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Profile Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              You can see the email and last login time of user which displayed
              in UTC form.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <div className="profile-grid">
            <div className="profile__header">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
              <div className="profile__headline">
                <h2 className="profile__title">Nickname: {user.nickname}</h2>
                <span className="profile__description">
                  Email: {user.email}
                </span>
                <span className="profile__description">
                  Last Login: {user.updated_at}
                </span>
                <span className="profile__description">
                  Login Count: {user.logins_count}
                </span>
                <span className="profile__description">
                  Created_at: {user.created_at}
                </span>
              </div>
            </div>
            <div className="profile__details">
              <CodeSnippet
                title="Decoded ID Token"
                code={JSON.stringify(user, null, 2)}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
