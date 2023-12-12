const trackChanges = () => {
 return `CREATE OR REPLACE FUNCTION capture_ticket_changes()
    RETURNS TRIGGER AS $$
    BEGIN
      IF NEW.status <> OLD.status OR NEW.assignee <> OLD.assignee OR NEW.comments <> OLD.comments THEN
        INSERT INTO ticket_history (ticket_id, status, assignee, comments)
        VALUES (NEW.id, NEW.status, NEW.assignee, NEW.comments);
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;`;
};

module.exports=trackChanges
