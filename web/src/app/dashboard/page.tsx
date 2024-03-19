"use client";

import { CreateTeamDialog } from "@/components/dialog/create-team-dialog";
import { Navbar } from "@/components/navbar";
import { PreLoader } from "@/components/pre-loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import { createClient } from "@/utils/supabase/client";
import {
  CalendarClock,
  Fingerprint,
  Pencil,
  Search,
  Users,
} from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TeamUserProps {
  id: string;
  name: string;
  email: string;
  telephone: string;
  role: string;
  teamId: string;
}

interface TeamsDataProps {
  id: string;
  name: string;
  teamManagerId: string;
  createdAt: string;
  users: TeamUserProps[];
}

export default function Home() {
  const router = useRouter();
  const [teamsData, setTeamsData] = useState<TeamsDataProps[]>();
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function loadSession() {
      setLoading(true);
      const session = await supabase.auth.getSession();

      if (!session.data.session) {
        router.push("/sign-in");
      }

      console.log(session);
      const { data } = await api.get(
        `/manager/${session.data.session?.user.identities?.[0].user_id}`
      );

      if (data.error === "The manager does not exist") {
        await api.post("/manager/create", {
          id: session.data.session?.user.identities?.[0].user_id,
          name: session.data.session?.user.identities?.[0].identity_data?.name,
          email:
            session.data.session?.user.identities?.[0].identity_data?.email,
          telephone: session.data.session?.user.phone,
        });
      }
      setLoading(false);
    }

    async function handleLoadTeams() {
      setLoading(true);
      const session = await supabase.auth.getSession();

      const { data } = await api.get(
        `/manager/${session.data.session?.user.identities?.[0].user_id}`
      );

      console.log(data.manager.teams);
      setTeamsData(data.manager.teams);
      setLoading(false);
    }

    loadSession();
    setTimeout(() => {
      handleLoadTeams();
    }, 2000);
  }, [supabase.auth, router]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="container mx-auto py-10 space-y-10">
          {teamsData?.map((team) => (
            <Card key={team.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{team.name}</CardTitle>
                    <CardDescription>
                      All informations about the <b>{team.name}</b> team
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => router.push(`/dashboard/team/${team.id}`)}
                    className="mt-5 flex items-center gap-2"
                  >
                    <Pencil size={14} />
                    Manage
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Users size={18} />
                  <p>Users count: {team.users.length}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CalendarClock size={18} />
                  <p>
                    Created at: {moment(team.createdAt).format("MMMM Do YYYY")}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Fingerprint size={18} />
                  <p>Team id: {team.id}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col h-screen my-auto py-10 space-y-10 items-center justify-center">
          <Search size={30} className="animate-pulse" />
          <p className="text-muted-foreground">
            Oops! No team was found registered on your account :(
          </p>
          <CreateTeamDialog />
        </div>
      )}
    </>
  );
}
