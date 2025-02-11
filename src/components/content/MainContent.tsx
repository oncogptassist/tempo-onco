import React from "react";
import { supabase } from "@/lib/supabase";
import { OncologyDoc } from "@/lib/types";
import { Card } from "@/components/ui/card";

const MainContent = () => {
  const [content, setContent] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const handleContentSelected = async (event: CustomEvent<OncologyDoc>) => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("oncology_docs")
          .select("content")
          .eq("id", event.detail.id)
          .single();

        if (error) throw error;
        setContent(data?.content || null);
      } catch (error) {
        console.error("Error fetching content:", error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener(
      "contentSelected",
      handleContentSelected as EventListener,
    );
    return () => {
      window.removeEventListener(
        "contentSelected",
        handleContentSelected as EventListener,
      );
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a topic from the sidebar to view content
      </div>
    );
  }

  return (
    <Card className="m-6 p-6">
      <div
        className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Card>
  );
};

export default MainContent;
