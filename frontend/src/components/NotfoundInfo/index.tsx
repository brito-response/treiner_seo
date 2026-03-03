import { Newspaper } from "lucide-react";
type NotfoundInfoProps = {
    title: string;
    content: string;
};

export const NotfoundInfo: React.FC<NotfoundInfoProps> = ({ title, content }) => {
    return (
        <div className="flex flex-col items-center justify-center h-80 md:h-96 rounded-2xl border border-dashed bg-muted/30 text-center px-6">
            <Newspaper className="w-24 h-24 text-muted-foreground" />
            <h2 className="text-xl md:text-2xl font-semibold">
                {title}
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
                {content}
            </p>
        </div>
    );
}