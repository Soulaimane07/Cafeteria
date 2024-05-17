use cafeteria
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_NAME = 'GetFavoriteDishes' AND ROUTINE_TYPE = 'PROCEDURE')
BEGIN
    DROP PROCEDURE GetFavoriteDishes;
END;

CREATE PROCEDURE 
GetFavoriteDishes
@clientId INT
AS
BEGIN
    SELECT d.titre AS dish_title, d.description AS dish_description, d.prix AS dish_price, c.titre AS category_title
    FROM favorites AS f
    INNER JOIN dishes AS d ON f.dishId = d.id
    INNER JOIN categories AS c ON d.categorieId = c.id
    WHERE f.clientId = @clientId;
END;

EXECUTE GetFavoriteDishes  13;

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_NAME = 'CalculateTotalAmountSpent' AND ROUTINE_TYPE = 'FUNCTION')
BEGIN
    DROP Function CalculateTotalAmountSpent;
END;

CREATE FUNCTION
CalculateTotalAmountSpent
(@clientId INT)
RETURNS DECIMAL(10, 2)
AS
BEGIN
    DECLARE @totalAmount DECIMAL(10, 2);
    SELECT @totalAmount = SUM(d.prix)
    FROM orders AS o
    INNER JOIN dishes AS d ON o.dishId = d.id
    WHERE o.clientId = @clientId;
    IF @totalAmount IS NULL
    BEGIN
        SET @totalAmount = 0.00;
    END
    RETURN @totalAmount;
END;

select dbo.CalculateTotalAmountSpent(13);


select * from dbo.orders
DECLARE orderCursor CURSOR FOR
    SELECT id, order_date
    FROM orders;
DECLARE @id INT, @order_date DATETIME;

OPEN orderCursor;
FETCH NEXT FROM orderCursor INTO @id, @order_date;

WHILE @@FETCH_STATUS = 0
BEGIN
    BEGIN TRY
        IF @order_date IS NULL
        BEGIN
            -- Handle NULL order_date
            PRINT 'id: '  +@id + ' Order date: NULL';
        END
        ELSE
        BEGIN
            -- Print if order_date is not NULL
            PRINT 'id: ' + CONVERT(VARCHAR, @id) + ' Order date: ' + CONVERT(VARCHAR, @order_date);
        END
    END TRY
    BEGIN CATCH
        -- Handle any errors occurred within the TRY block
        PRINT 'An error occurred: ' + ERROR_MESSAGE();
    END CATCH

    FETCH NEXT FROM orderCursor INTO @id, @order_date;
END;

CLOSE orderCursor;
DEALLOCATE orderCursor;

INSERT INTO orders (clientId,dishId, order_date)
VALUES
    (13,1, '2024-05-15 10:00:00');